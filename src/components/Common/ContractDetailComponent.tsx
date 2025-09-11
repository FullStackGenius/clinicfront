import React from 'react'
import helpers from '../../_helpers/common';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    country_name: string;
    profile_image_path: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    budget_type_label: string;
    project_type_label: string;
}

interface Contract {
    id: number;
    type: string;
    amount: string;
    status: string;
    payment_type: string;
    started_at: string;
    ended_at: string;
    freelancer: User;
    client: User;
    project: Project;
}


interface ContractQverviewProps {
    contractData: Contract | null;

}

const ContractDetailComponent: React.FC<ContractQverviewProps> = ({ contractData }) => {
    const user = useSelector((state: RootState) => state.user.user);
    return (
        <>
            <div className="workroom-tab-content-section">
                <div className="hourly-description-section">
                    <div className="contract-description-block">
                        <h2>Description</h2>
                        <p dangerouslySetInnerHTML={{ __html: contractData?.project?.description ?? "" }}></p>
                    </div>
                    <div className="contract-summary-block">
                        <h2>Summary</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Contract type</td>
                                    <td>
                                        {helpers.toTitleCase(contractData?.project.budget_type_label)}</td>
                                </tr>
                                <tr>
                                    <td>Total spent</td>
                                    <td>${contractData?.amount}</td>
                                </tr>
                                <tr>
                                    <td>Start date</td>
                                    <td>{contractData?.started_at}</td>
                                </tr>
                                <tr>
                                    <td>End date</td>
                                    <td>{contractData?.ended_at}</td>
                                </tr>
                                <tr>
                                    <td>Contact person</td>
                                    {user && user.role_id === 2 ? (<td>{helpers.toTitleCase(contractData?.freelancer?.name)} {contractData?.freelancer?.last_name}</td> ):(<td>{helpers.toTitleCase(contractData?.client?.name)} {contractData?.client?.last_name}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContractDetailComponent