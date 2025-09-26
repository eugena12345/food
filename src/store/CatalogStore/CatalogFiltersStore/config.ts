import rootStore from "~store/RootStore/instance";

export const getSearchInit = () => {
    return rootStore.query.getParam("search")?.toString() || "";
};

export const getCategoryInit = () => {
    const categories = rootStore.query.getParam("categories")?.toString();
    return categories ? categories.split(",") : [];
}