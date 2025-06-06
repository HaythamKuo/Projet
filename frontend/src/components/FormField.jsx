import { ErrMes, ErrBox, FormGroup } from "../styles/form.style";

function FormField({
  label,
  type,
  name,
  placeholder,
  mes = "錯誤, 請重新輸入",
  err,
  ...rest
}) {
  return (
    <FormGroup>
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
