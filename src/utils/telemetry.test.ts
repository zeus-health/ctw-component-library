import { datadogLogs } from "@datadog/browser-logs";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import packageJson from "../../package.json";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

const fetchMock = createFetchMock(vi);

describe("telemetry", () => {
  const originalEnv = Telemetry.environment;

  beforeEach(() => {
    Telemetry.setEnv("test");
    fetchMock.enableMocks();
    vi.useFakeTimers();
  });
  afterEach(() => {
    Telemetry.setEnv(originalEnv);
    fetchMock.disableMocks();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test("withTimingMetric decorator times and reports", async () => {
    const spy = vi.spyOn(Telemetry, "reportMetric");
    spy.mockImplementation(async () => undefined);
    // We'll fake a long-running function using vitest to override system time
    const start = new Date();
    const end = new Date(start.getTime() + 10000);

    vi.setSystemTime(start);
    const timedFunction = withTimerMetric(async () => {
      vi.setSystemTime(end);
    }, "timer_metric.test");

    await timedFunction();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith("timing", "timer_metric.test", 10000, []);
  });

  test("reportMetric normalizes and tags metrics", async () => {
    const reportMetricSpy = vi.spyOn(Telemetry, "reportMetric");

    await withTimerMetric(async () => undefined, "AmI.or-AmI Not")();

    const fetches = fetchMock.requests();
    expect(reportMetricSpy).toHaveBeenCalledTimes(1);
    expect(reportMetricSpy).toBeCalledWith("timing", "AmI.or-AmI Not", 0, []);
    expect(fetches.length).toEqual(1);
    expect(fetches[0].url).toEqual("http://localhost:3000/report/metric");
    const versionTag = `version:${packageJson.version}`;
    expect(await fetches[0].json()).toEqual({
      name: "am_i.or_am_i_not",
      type: "timing",
      tags: [
        "service:ctw-component-library",
        "env:test",
        "is_super:false",
        "ehr:unknown",
        versionTag,
      ],
      value: 0,
    });
  });

  test("Default datadog clients", async () => {
    const datadogLogsInitSpy = vi.spyOn(datadogLogs, "init");

    datadogLogsInitSpy.mockImplementation(() => undefined);

    Telemetry.init("test");
    expect(datadogLogsInitSpy).not.toHaveBeenCalled();
  });
});
