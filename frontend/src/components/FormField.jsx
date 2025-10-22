import { ErrMes, ErrBox, FormGroup } from "../styles/form.style";

function FormField({
  width,
  label,
  type,
  name,
  placeholder,
  mes = "錯誤, 請重新輸入",
  $isCenter,
  $firstPadding,
  err,
  ...rest
}) {
  return (
    <FormGroup
      $isCenter={$isCenter}
      $firstPadding={$firstPadding}
      $width={width}
    >
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        required
        {...rest}
      />
      {err && (
        <ErrBox>
          <ErrMes>{mes}</ErrMes>
        </ErrBox>
      )}
    </FormGroup>
  );
}

export default FormField;
