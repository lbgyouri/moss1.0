import request from "@/service/http";


//获取实时概览汇总数据
export const GetSummary = (params) => request.get('/necc/global/summary', { params })
//获取实时发电量预测情况
export const Getforecast = (params) => request.get('/necc/global/prediction', { params })
//获取发电量、计划完成情况明细
export const GetGeneration = (params) => request.get('/necc/global/generations', { params })
//地图
export const GetMap = (params) => request.get('/necc/global/map', { params })
//曲线功率
export const GetPowers = (params) => request.get('/necc/global/powers', { params })


//风机状态
export const GetTurbineStatus = (params) => request.get('/necc/turbine/statuses', { params })
export const GetBasePlant = (params) => request.get('/necc/base/plants', { params })
//风机信息
export const GetTurbineInfos = (data) => request.get(`/necc/turbine/infos?plantId=${data}`)
export const Getdiagnosis = (params) => request.get(`/necc/diagnosis/alarm-logs`,{params})

export const GetWarnning = (params) => request.get(`/necc/diagnosis/turbine-fault`,{params})
export const GetWarnningType = (params) => request.get(`/necc/diagnosis/fault-cons`,{params})
export const GetFaultData = (params) => request.get(`/pms/api/fault-tree/list`,{params})
export const GetFaultSummary = (params) => request.get(`/necc/diagnosis/fault-summary`,{params})
export const GetGlobalMap = (params) => request.get(`/necc/global/map`,{params})
export const GetWind= (params) => request.get(`/necc/plant/wind-tower`,{params})
export const GetWeather= (params) => request.get(`/necc/plant/weather-station`,{params})
export const GetPlantMeters= (params) => request.get(`/necc/plant/meters`,{params})



