import React from 'react';

const DeclineModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Decline</h5>
                        <button type="button" className="close" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to decline this user?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Decline</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeclineModal;