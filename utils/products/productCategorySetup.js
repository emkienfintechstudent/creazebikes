import { getAllProductCategory } from "../../services/CRUDService.js";

let keys;
let getALLProductCategory;

const setupProductCategory = async () => {
    getALLProductCategory = await getAllProductCategory();
    keys = Object.keys(getALLProductCategory);
};

export { setupProductCategory, keys, getALLProductCategory };