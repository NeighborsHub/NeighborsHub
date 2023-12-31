import Apis from "services/apis";
import { setMyAddresses } from "store/slices/userSlices";

export const getMyAddresses = () => {
  return async (dispatch) => {
    const result = await Apis.address.getListOfAddress();
    if (result) {
      dispatch(setMyAddresses(result.addresses?.results || []));
    }
  };
};
