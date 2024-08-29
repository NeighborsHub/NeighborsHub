/*
 *  Copyright (c) 2018-present, SLS
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { SnackbarProvider } from "notistack";
import {
  SnackbarUtilsConfigurator,
  // StyledSuccess,
  // StyledWarning,
  // StyledError,
} from "utils/SnackbarUtils";
// import { withStyles } from "@mui/styles";

// const styles = (/*theme*/) => ({
//   containerRoot: {
//     "& div[aria-describedby='notistack-snackbar'] > div:nth-child(2)": {
//       marginRight: "auto",
//       marginLeft: "-8px",
//       paddingLeft: 0,
//     },
//   },
// });

function withSnackbarNotifications(WrappedComponent) {
  class NotificationsWrapper extends React.Component {
    render() {
      const { classes } = this.props;
      return (
        <SnackbarProvider
          // classes={{
          //   containerRoot: classes.containerRoot,
          // }}
          maxSnack={3}
          hideIconVariant
          autoHideDuration={2000}
          // Components={{
          //   success: StyledSuccess,
          //   error: StyledError,
          //   warning: StyledWarning,
          // }}
        >
          <SnackbarUtilsConfigurator />
          <WrappedComponent {...this.props} />
        </SnackbarProvider>
      );
    }
  }
  NotificationsWrapper.propTypes = {
    classes: PropTypes.object,
  };
  return NotificationsWrapper;
  // return withStyles(styles)(NotificationsWrapper);
}

export default withSnackbarNotifications;
