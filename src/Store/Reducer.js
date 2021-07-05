export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  accessToken:
    "BQCaBiEpRZggdgeTHP2MYBkHedNOMIGFA0Yjiga-jtw7AxIfZU7BKKhdu2xj3zfPXNN9pecSlKw7JCPzjV5HxcZ0s_xHAOn8a2MT37pDkMVqE-ulbZ2JxzbUV_i9jaGq9dGLhSu4QokiNFUJivrvqf6drIDPIQ_QSxDC_2mhLDw3WmU_",
};

const Reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default Reducer;