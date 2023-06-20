import RegionService from "../services/regionService";

const regionService = new RegionService();

let regions = [];
regionService.getRegions().then(res => {
    regions = res.map(item => item)
})
let countries = []
regionService.getAllCountries().then(res => {
    countries = res.map(cntry => cntry);
})


export  {regions};
export {countries};