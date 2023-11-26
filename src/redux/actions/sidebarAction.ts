const setSideBarIndex = (index: number) => {
  return {
    type: 'SET_SIDEBAR_INDEX',
    index,
  };
};

const exportDefault = {
  setSideBarIndex,
};

export default exportDefault;
