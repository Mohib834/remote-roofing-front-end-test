import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { AppState } from "store/reducers";

type OwnProps = {}
type Props = OwnProps & StoreStateProps;

const GlobalSnackBar: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.snackbar.open);
  }, [props.snackbar.open]);

  const closeHandler = () => {
      setOpen(false);
  };

  return (
      <Snackbar
        color="primary"
        anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
        open={open}
        autoHideDuration={3000}
        onClose={closeHandler}
      >
          <Alert severity={props.snackbar.color}>
              {props.snackbar.message}
          </Alert>
      </Snackbar>
  );
};

type StoreStateProps = {
    snackbar: {
        open: boolean;
        color: "success" | "info" | "warning" | "error";
        message: string;
    };
}

const mapStateToProps = (state: AppState): StoreStateProps => ({
    snackbar: state.userAuth.snackbar
});

export default connect(mapStateToProps)(GlobalSnackBar);
