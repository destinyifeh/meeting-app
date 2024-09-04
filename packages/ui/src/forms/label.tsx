import classNames from "classnames";

export const Label = (props: JSX.IntrinsicElements["label"]) => {
  return (
    <label className={classNames("block", props.className)} {...props}>
      {props.children}
    </label>
  );
};
