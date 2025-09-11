import DocViewer from "react-doc-viewer";

function ResumePreview() {
	const docs = [
    { uri: "https://clinicback.obsidiantechno.com/storage/freelancer-resume/44d8e72a-780c-45a9-b111-5d7235affebc.pdf" },
  ];
	
	return (
			<DocViewer documents={docs} />
	);
}

export default ResumePreview;
