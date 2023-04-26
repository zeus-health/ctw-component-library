import cx from "classnames";
import xpath from "xpath";
import { DocumentDetails } from "./components/DocumentDetails";
import { Header } from "./components/Header/Header";
import { Section } from "./components/Section/Section";
import { DocumentOnlyProps, SectionType } from "./types";

export const CcdaViewer = ({ document }: DocumentOnlyProps): JSX.Element => {
  const sections = xpath.select(
    "//*[name()='component']/*[name()='section']",
    document
  ) as Document[];

  const texts: SectionType[] = sections.map((section) => {
    const title = String(xpath.select1("string(*[name()='title'])", section));
    const humanReadable = xpath.select1("*[name()='text']", section) as Document;

    const code = String(xpath.select1("string(*[name()='code']/@code)", section));

    return { title, humanReadable, code };
  });

  return (
    <div
      className={cx({
        width: "calc(100vw - 200px - 24px - 24px - 16px - 16px - 2px)",
      })}
    >
      <Header document={document} />
      <DocumentDetails document={document} />
      {texts.map(({ title, humanReadable, code }) => (
        <Section key={`el-text-${code}`} title={title} humanReadable={humanReadable} />
      ))}
    </div>
  );
};
