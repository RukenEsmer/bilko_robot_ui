import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.sass'

import ProgramStatus from '../ProgramStatus'
import Modal from '../Modal'
import ProgramLogs from '../ProgramLogs'

const Footer = () => {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.footer.visible)
  const modalVisible = useSelector(state => state.footer.modalVisible)

  return (
    visible && (
      <>
        <footer className="footer">
          <ProgramStatus />
        </footer>
        {modalVisible && (
          <Modal
            closeFunction={() => dispatch({ type: 'HIDE_FOOTER_MODAL' })}
            style={{ justifyContent: 'flex-end', paddingBottom: 75 }}
            contentStyle={{ minHeight: '80vh', maxHeight: '80vh' }}
            bodyStyle={{ width: '100%' }}>
            <ProgramLogs title="Logs Quick View" />
          </Modal>
        )}
      </>
    )
  )
}

export default Footer
