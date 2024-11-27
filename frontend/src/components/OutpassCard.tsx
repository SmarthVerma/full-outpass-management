import formatDateTime from '@/lib/formatDateTime';
import { FormatOutpassTable } from '@/lib/formatOutpassForTable';
import React from 'react';

export const OutpassCard = ({ rowData }: { rowData: FormatOutpassTable }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl font-semibold font-serif underline text-gray-800">Outpass</h1>
                <h2 className="text-lg font-thin font-serif text-gray-600">Shashtri</h2>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
                <p className="font-bold">Enrollment No: <span className="font-normal font-mono">{rowData.id}</span></p>
                <p className="font-bold">Name: <span className="font-normal font-mono"> {rowData.name} </span></p>
                <p className="font-bold">Block/Building: <span className="font-normal font-mono"> {rowData.block} </span></p>
                <p className="font-bold">Room No: <span className="font-normal font-mono"> {rowData.roomNumber} </span></p>
                <p className="font-bold">Contact No: <span className="font-normal font-mono"> {rowData.contactNumber} </span></p>
                <p className="font-bold">Parent's Number: <span className="font-normal font-mono"> {rowData.guardianContactNo} </span></p>
                <p className="font-bold col-span-2">Reason for Leave: <span className="font-normal font-mono "> {rowData.reason} </span></p>
                <p className="font-bold">Date From: <span className="font-normal font-mono"> {formatDateTime(rowData.dateFrom)} </span></p>
                <p className="font-bold">Date To: <span className="font-normal font-mono"> {formatDateTime(rowData.dateTo)} </span></p>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
                <p className="font-bold text-2xl">OTP Verified: <span className="font-normal font-mono text-green-500"> {rowData.status == "Verified" ? "✅" : "❌"} </span></p>
            </div>
        </div>
    );
};
