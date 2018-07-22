class Data {
    //是否一直刷新状态
    isContinueTask = true;

    updateTimes = null;

    updateUnitTask = {

        recordStatus: null,
        liveStatus: null,
        safetyRemoveStatus: null,
        OutputStatus: null
    };

    updatePictureTask = {
        status: null
    };
}

const data = new Data();
Data.getInstance = () => data;
export default data;