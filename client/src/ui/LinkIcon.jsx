import styled from "styled-components";
import PropTypes from "prop-types";

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;

  color: var(--color-grey-700);
  text-underline-offset: 3px;

  & > span > svg {
    position: relative;
    font-size: 1.8rem;
    top: 3px;
  }

  &:hover {
    color: #007bff;
  }
`;

function LinkIcon({ children, icon, href }) {
  return (
    <StyledLink href={href}>
      <span>{icon}</span>
      {children}
    </StyledLink>
  );
}

// review: defining default and prop type for LinkIcon props
LinkIcon.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  href: PropTypes.string,
};

LinkIcon.defaultProps = {
  href: "#",
};

export default LinkIcon;
