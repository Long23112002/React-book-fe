import RequireAdmin from "./RequireAdmin";
import { FeedbackTable } from "./components/feedback/FeedbackTable";

const FeedbackManagement = () => {
	return (
		<div className='container p-5'>
			<div className='shadow-4-strong rounded p-5'>
				<FeedbackTable />
			</div>
		</div>
	);
};

const FeedbackPage = RequireAdmin(FeedbackManagement);
export default FeedbackPage;
