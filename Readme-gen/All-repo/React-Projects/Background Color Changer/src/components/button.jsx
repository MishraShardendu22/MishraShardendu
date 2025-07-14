// components/button.jsx
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';

function Btn({ onClick, bgColor, textColor }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        border: '2px solid', 
        borderColor: textColor, 
        ':hover': {
          backgroundColor: '#616161',
        },
      }}
    >
      Change the color !!!!
    </Button>
  );
}

Btn.propTypes = {
  onClick: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

Btn.defaultProps = {
  bgColor: "red",
  textColor: "black",
};

export default Btn;
