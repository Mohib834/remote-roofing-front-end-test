import React, { useState, useEffect, Dispatch } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { AppState } from "store/reducers";
import { AppActions } from "store/actions/types";
import { showSnackbar } from "store/actions/userAuth";

type OwnProps = {}
type Props = OwnProps & StoreStateProps & StoreDispatchProps;

const GlobalSnackBar: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.snackbar.open);
  }, [props.snackbar.open]);

  const closeHandler = () => {
      setOpen(false);
      props.showSnackbar({
        open: false,
        message:'',
        color:'success',
      });
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

type Snackbar = {
  open: boolean;
  color: "success" | "info" | "warning" | "error";
  message: string;
};

type StoreStateProps = {
    snackbar: Snackbar;
}

type StoreDispatchProps = {
  showSnackbar: ( snackbar: Snackbar) => void;
}

const mapStateToProps = (state: AppState): StoreStateProps => ({
    snackbar: state.userAuth.snackbar
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>): StoreDispatchProps => ({
  showSnackbar: (snackbar) => dispatch(showSnackbar(snackbar))
});


export default connect(mapStateToProps, mapDispatchToProps)(GlobalSnackBar);
