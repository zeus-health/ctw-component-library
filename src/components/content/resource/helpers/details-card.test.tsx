/* eslint-disable react/void-dom-elements-no-children */
import { recursivelyTransposeTables } from "./details-card";

// NOTES:
// 1. void-dom-elements-no-children is enabled for the file to make the tests happy. This might be an artifact
//    of how `html-react-parser` works
// 2. modifications to the expected or the div content is whitespace sensitive

const smallDivContent = `<table>
  <thead>
    <tr>
      <th>Col 1</th>
      <th>Col 2</th>
      <th>Col 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>hi</td>
      <td>hi again</td>
      <td>hi again again</td>
    </tr>
  </tbody>
</table>`;

const largeDivContent = `<div><ul><li><h2>Consultation (Within 1 month) - Closed</h2><table>
      <thead>
        <tr>
          <th>Specialty</th>
          <th>Diagnoses / Procedures</th>
          <th>Referred By Contact</th>
          <th>Referred To Contact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Neurology</td>
          <td><p>Diagnoses</p><p>Muscular dystrophy.</p><br /></td>
          <td><p>Knight, Bryan J, DO</p><p>1 Lincolon St</p><p>Ste 2400</p><p>Boston, MA 02111</p><p>Phone: 508-555-5555</p><p>Fax: 781-555-5555</p><p>Email: bknight@zushealth.com</p></td>
          <td><p>Acme Health</p><p>200 Jefferson St</p><p>Newton, MA 02462-1607</p><p>Phone: 617-555-5555</p></td>
        </tr>
      </tbody>
    </table><table>
      <thead>
        <tr>
          <th>Referral ID</th>
          <th>Status</th>
          <th>Reason</th>
          <th>Start Date</th>
          <th>Expiration Date</th>
          <th>Visits Requested</th>
          <th>Visits Authorized</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>789456789456</td>
          <td>Closed</td>
          <td></td>
          <td>12/25/2022</td>
          <td>12/25/2022</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </table><table>
      <thead>
        <tr>
          <th>Scheduling Instructions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><p>Office to Office is live in Neurology for the following practice:</p><p>Acme Health Neurology Associates, P.C.</p></td>
        </tr>
      </tbody>
    </table><br /><p>Electronically signed by Bryan J Knight DO at 12/25/2022 12:39 PM EDT</p></li></ul></div>`;

describe("detail card tests", () => {
  describe("transpose", () => {
    const tests = [
      {
        skip: true,
        name: "one table, one data row, no thead row",
        value: (
          <div>
            <table>
              <thead>
                <th>Col 1</th>
                <th>Col 2</th>
                <th>Col 3</th>
              </thead>
              <tbody>
                <tr>
                  <td>hi</td>
                  <td>hi again</td>
                  <td>hi again again</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        expected: (
          <div>
            <table>
              <tbody>
                <tr key="transposed-0">
                  <td key="col-0">Col 1</td>
                  <td key="data-0-0">hi</td>
                </tr>
                <tr key="transposed-1">
                  <td key="col-1">Col 2</td>
                  <td key="data-1-1">hi again</td>
                </tr>
                <tr key="transposed-2">
                  <td key="col-2">Col 3</td>
                  <td key="data-2-2">hi again again</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        skip: true,
        name: "one table, two data rows, no thead row",
        value: (
          <div>
            <table>
              <thead>
                <th>Col 1</th>
                <th>Col 2</th>
                <th>Col 3</th>
              </thead>
              <tbody>
                <tr>
                  <td>hi</td>
                  <td>hi again</td>
                  <td>hi again again</td>
                </tr>
                <tr>
                  <td>goodbye</td>
                  <td>goodbye again</td>
                  <td>goodbye again again</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        expected: (
          <div>
            <table>
              <tbody>
                <tr key="transposed-0">
                  <td key="col-0">Col 1</td>
                  <td key="data-0-0">hi</td>
                </tr>
                <tr key="transposed-1">
                  <td key="col-1">Col 2</td>
                  <td key="data-1-1">hi again</td>
                </tr>
                <tr key="transposed-2">
                  <td key="col-2">Col 3</td>
                  <td key="data-2-2">hi again again</td>
                </tr>
                <tr key="transposed-3" className="ctw-outline">
                  <td key="col-0">Col 1</td>
                  <td key="data-3-0">goodbye</td>
                </tr>
                <tr key="transposed-4">
                  <td key="col-1">Col 2</td>
                  <td key="data-4-1">goodbye again</td>
                </tr>
                <tr key="transposed-5">
                  <td key="col-2">Col 3</td>
                  <td key="data-5-2">goodbye again again</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        name: "one table, one data row, thead row, content",
        value: <div content={smallDivContent} />,
        expected: (
          <table>
            <tbody>
              <tr key="transposed-0">
                <td key="col-0">Col 1</td>
                <td key="data-0-0">hi</td>
              </tr>
              <tr key="transposed-1">
                <td key="col-1">Col 2</td>
                <td key="data-1-1">hi again</td>
              </tr>
              <tr key="transposed-2">
                <td key="col-2">Col 3</td>
                <td key="data-2-2">hi again again</td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        name: "three tables, one data row, thead row, content",
        value: <div content={largeDivContent} />,
        expected: (
          <div>
            <ul>
              <li>
                <h2 key={0}>Consultation (Within 1 month) - Closed</h2>
                <table>
                  <tbody>
                    <tr key="transposed-0">
                      <td key="col-0">Specialty</td>
                      <td key="data-0-0">Neurology</td>
                    </tr>
                    <tr key="transposed-1">
                      <td key="col-1">Diagnoses / Procedures</td>
                      <td key="data-1-1">
                        <p key="0">Diagnoses</p>
                        <p key="1">Muscular dystrophy.</p>
                        <br key="2">{null}</br>
                      </td>
                    </tr>
                    <tr key="transposed-2">
                      <td key="col-2">Referred By Contact</td>
                      <td key="data-2-2">
                        <p key="0">Knight, Bryan J, DO</p>
                        <p key="1">1 Lincolon St</p>
                        <p key="2">Ste 2400</p>
                        <p key="3">Boston, MA 02111</p>
                        <p key="4">Phone: 508-555-5555</p>
                        <p key="5">Fax: 781-555-5555</p>
                        <p key="6">Email: bknight@zushealth.com</p>
                      </td>
                    </tr>
                    <tr key="transposed-3">
                      <td key="col-3">Referred To Contact</td>
                      <td key="data-3-3">
                        <p key="0">Acme Health</p>
                        <p key="1">200 Jefferson St</p>
                        <p key="2">Newton, MA 02462-1607</p>
                        <p key="3">Phone: 617-555-5555</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr key="transposed-0">
                      <td key="col-0">Referral ID</td>
                      <td key="data-0-0">789456789456</td>
                    </tr>
                    <tr key="transposed-1">
                      <td key="col-1">Status</td>
                      <td key="data-1-1">Closed</td>
                    </tr>
                    <tr key="transposed-2">
                      <td key="col-2">Reason</td>
                      <td key="data-2-2">{null}</td>
                    </tr>
                    <tr key="transposed-3">
                      <td key="col-3">Start Date</td>
                      <td key="data-3-3">12/25/2022</td>
                    </tr>
                    <tr key="transposed-4">
                      <td key="col-4">Expiration Date</td>
                      <td key="data-4-4">12/25/2022</td>
                    </tr>
                    <tr key="transposed-5">
                      <td key="col-5">Visits Requested</td>
                      <td key="data-5-5">1</td>
                    </tr>
                    <tr key="transposed-6">
                      <td key="col-6">Visits Authorized</td>
                      <td key="data-6-6">1</td>
                    </tr>
                  </tbody>
                </table>
                <table key="3">
                  <thead key="1">
                    <tr key="1">
                      <th key="1">Scheduling Instructions</th>
                    </tr>
                  </thead>
                  <tbody key="3">
                    <tr key="1">
                      <td key="1">
                        <p key="0">
                          Office to Office is live in Neurology for the following practice:
                        </p>
                        <p key="1">Acme Health Neurology Associates, P.C.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br key="4">{null}</br>
                <p key="5">Electronically signed by Bryan J Knight DO at 12/25/2022 12:39 PM EDT</p>
              </li>
            </ul>
          </div>
        ),
      },
    ];
    test.each(tests)("transpose: $name", ({ value, expected }) => {
      expect(JSON.stringify(expected)).toStrictEqual(
        JSON.stringify(recursivelyTransposeTables(value, 0))
      );
    });
  });
});
