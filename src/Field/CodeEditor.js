import React from "react";
import { changeHandler, setFieldValueWrapper } from "../utils";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { githubLight } from "@uiw/codemirror-theme-github";

const CodeEditor = ({ config, formik, value, error }) => {
  const {
    name,
    language,
    options,
    attributes,
    fieldClass = "",
  } = config;

  const { setFieldValue, handleBlur } = formik;
  const selectedValue = value || "";

  return (
    <div className={"position-relative"}>
      <div className="position-absolute bg-white shadow px-2 py-0 rounded-2 top-0 end-0 z-1">
        {language}
      </div>
      <CodeMirror
        value={selectedValue}
        extensions={[loadLanguage(language)]}
        theme={githubLight}
        id={name}
        name={name}
        className={fieldClass + (error ? " is-invalid " : "")}
        onChange={(value, viewUpdate) => {
          changeHandler(
            setFieldValueWrapper(setFieldValue, name),
            formik,
            config,
            value,
          );
        }}
        {...options}
        {...attributes}
      />
    </div>
  );
};

export default React.memo(CodeEditor);
