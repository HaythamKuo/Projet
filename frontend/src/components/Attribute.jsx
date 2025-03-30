import {
  StarBorderContainer,
  BorderGradientBottom,
  BorderGradientTop,
  InnerContent,
} from "../styles/attribute.style";

const Attribute = ({
  as,
  className = "",
  color = "white",
  speed = "6s",
  children,
  ...rest
}) => {
  return (
    <StarBorderContainer as={as} className={className} {...rest}>
      <BorderGradientBottom color={color} speed={speed} />
      <BorderGradientTop color={color} speed={speed} />
      <InnerContent>{children}</InnerContent>
    </StarBorderContainer>
  );
};

export default Attribute;

//娃娃 服務 租借
