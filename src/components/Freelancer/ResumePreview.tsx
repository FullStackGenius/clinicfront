// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import DocViewer from "react-doc-viewer";
// import AuthLayout from '../layouts/AuthLayout';
// import Header from '../layouts/partials/Header';
// import axiosInstance from "../../_helpers/axiosInstance";
// import helpers from "../../_helpers/common";


function ResumePreview() {
	// const navigate = useNavigate();
	const docs = [
    { uri: "https://clinicback.obsidiantechno.com/storage/freelancer-resume/44d8e72a-780c-45a9-b111-5d7235affebc.pdf" },
  ];
	
	return (
		
			<DocViewer documents={docs} />
		
	);
}

export default ResumePreview;
