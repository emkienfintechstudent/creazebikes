import {getCustomerDataForReport,getDataForReportLineChart1} from "../services/ChartService.js"
import {topCustomers,revenueReport_sql,dataTotalProfit,dataForGeneralReport} from "../services/adminService.js"
const getDashboardOverview1 =  async (req,res) => {
    // report-donut-chart 
  const results =  await getCustomerDataForReport()
  let sumOfCustomers = 0
  const donutLabels = [], donutData = [];
  results.forEach(result => {
    donutLabels.push(result.age_group)
   donutData.push(result.percentage)
   sumOfCustomers += parseInt(result.count);
  })

//  top customers 
   const topTenCustomers = await topCustomers()
  // total profit 
  const totalProfit = await dataTotalProfit()
  // general report
  const generalReport = await dataForGeneralReport()
  if (req.isAuthenticated()) {
      console.log(req.user)
      res.render("admin/dashboard_overview_1.ejs",{ Labels: donutLabels, Data: donutData, sumOfCustomers:sumOfCustomers, topTenCustomers:topTenCustomers,totalProfit:totalProfit,generalReport:generalReport}) 
    }else {
      res.redirect("/login")
  }  
}
const getDataOverview1 =  async (req,res) => {
  // report-donut-chart 
  const results =  await getCustomerDataForReport()
  const donutLabels = [], donutData = [];
  results.forEach(result => {
    donutLabels.push(result.age_group)
   donutData.push(result.percentage)
  })
 
   const revenueReport= await revenueReport_sql()
  const DataReportLineChart1 = await getDataForReportLineChart1()
    res.json({ Labels: donutLabels, Data: donutData ,revenueReport:revenueReport,DataReportLineChart1:DataReportLineChart1}); 
}




const getAdminProfile = async (req,res) => { 
  res.render("admin/profile.ejs")
}
export  {getAdminProfile,  getDashboardOverview1,getDataOverview1}