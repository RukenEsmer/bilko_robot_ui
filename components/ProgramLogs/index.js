import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './index.sass'

import Content from '../../components/Content'
import Icons from '../../utils/icons'

import makeRequest from '../../utils/api-server'
import { toast } from 'react-toastify'
import PageLoader from '../../components/PageLoader'
import ContentError from '../../components/ContentError'
import { makeLog } from '../../store/actions/app'

const ProgramLogs = ({ title }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [logs, setLogs] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    let mounted = true
    async function fetchLogs() {
      try {
        const response = await makeRequest({
          url: '/v1/logs',
          params: { limit: 50 }
        })

        setLogs(response.data.map(log => makeLog(log)))
        setLoading(false)
      } catch (error) {
        if (mounted) {
          toast.error(`Error while loading logs: ${error.message}`, {
            autoClose: false
          })

          setErrorMessage(error.message)
        }
      }
    }
    fetchLogs()

    return () => {
      mounted = false
      setLoading(true)
      setError(false)
    }
  }, [dispatch])

  return loading ? (
    <PageLoader message="Loading logs..." />
  ) : error ? (
    <ContentError>{errorMessage}</ContentError>
  ) : (
    <>
      <h3>{title}</h3>
      <div className="program-logs">
        <div className="log header">
          <span className="icon"></span>
          <span className="time">Time</span>
          <span className="source">Source</span>
          <span className="message">Description</span>
        </div>
      </div>
      <Content name="program-logs" scrollable>
        {logs.length > 0 ? (
          logs.map((log, key) => {
            return (
              <div key={key} className={`log ${log.type}`}>
                <span className="icon">
                  {log.type === 'error' ? (
                    <Icons.ErrorMessage />
                  ) : log.type === 'warning' ? (
                    <Icons.WarningMessage />
                  ) : (
                    <Icons.InfoMessage />
                  )}
                </span>
                <span className="time">
                  <span>{log.timestamp.time}</span>
                </span>
                <span className="source">{`${log.source}-${log.messageId}`}</span>
                <span className="message">{log.message}</span>
              </div>
            )
          })
        ) : (
          <div className={`log`}>
            <span className="icon">
              <Icons.InfoMessage />
            </span>
            <span className="time"></span>
            <span className="source"></span>
            <span className="message">Logs will appear here.</span>
          </div>
        )}
      </Content>
    </>
  )
}

export default ProgramLogs
