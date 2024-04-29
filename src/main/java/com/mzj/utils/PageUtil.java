package com.mzj.utils;

public class PageUtil {
    private int pageSize; // 每页容量
    private int currentPageNo;  //当前页面
    private int totalCount; //游戏总数
    private int totalPageCount; //页面总数

    public void setPageSize(int pageSize) {
        if (pageSize > 0){
            this.pageSize = pageSize;
        }
    }

    public void setCurrentPageNo(int currentPageNo) {
        this.currentPageNo = currentPageNo;
    }

    public void setTotalCount(int totalCount) {
        if (totalCount != 0 && pageSize != 0){
            this.totalCount = totalCount;
            setTotalPageCount();
        }

    }
    private void setTotalPageCount(){
        totalPageCount  = (totalCount % pageSize == 0 ? totalCount / pageSize : totalCount / pageSize + 1);
    }

    public int getPageSize() {
        return pageSize;
    }

    public int getCurrentPageNo() {
        return currentPageNo;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public int getTotalPageCount() {
        return totalPageCount;
    }
}
