const FormInput = ({
  id,
  value,
  handleChange,
  handleBlur,
  error,
  isTouched,
}) => {
  return (
    <>
      <input
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          error && isTouched
            ? "border-2 border-red-500 h-14 w-full rounded-xl px-4 text-lg outline-none"
            : "border-0 h-14 w-full rounded-lg px-4 text-lg outline-none placeholder:text-slate-700"
        }
        placeholder={id}
      ></input>
      {error && isTouched ? (
        <p className="pl-2 text-red-500 text-sm">{error}</p>
      ) : null}
    </>
  );
};

export default FormInput;