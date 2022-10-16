import React from "react"
import { FormControl, InputGroup, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getReports } from "../../../../store/actions/admin/reports"
import ReportItem from "./ReportItem"
import "./Reports.css"

export const Reports = () => {
  const dispatch = useDispatch()
  const [dates, setDates] = React.useState({ startDate: "", endDate: "" })
  const getReportBtn = () => {
    dispatch(getReports(dates))
  }
  const report = useSelector(state => state.reports.get)
  return (
    <div className='reports'>
      <span className='auth_label'>Начальная дата*</span>
      <InputGroup>
        <FormControl
          value={dates.startDate}
          onChange={e => setDates({ ...dates, startDate: e.target.value })}
          name='startDate'
          type='datetime-local'
          className='auth_input'
        />
      </InputGroup>

      <span className='auth_label'>Конечная дата*</span>
      <InputGroup>
        <FormControl
          value={dates.endDate}
          onChange={e => setDates({ ...dates, endDate: e.target.value })}
          name='endDate'
          type='datetime-local'
          className='auth_input'
        />
      </InputGroup>
      <Button onClick={getReportBtn} className='reports_btn'>
        Найти
      </Button>
      {report.success && !report.report.orders.length && (
        <div className='report_info'>По этим датам данных нет</div>
      )}
      {report.success && report.report.orders && (
        <div className='report_reports'>
          {report.report.orders.map(o => (
            <ReportItem key={o.id} order={o} />
          ))}
          <h2>Сумма: {report.report.total_sum} сом</h2>
        </div>
      )}
    </div>
  )
}
