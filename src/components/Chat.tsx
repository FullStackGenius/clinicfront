import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../_helpers/axiosInstance";
import helpers from "../_helpers/common";
import type { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Loader from './Common/Loader';

interface CurrentChatUser {
    id: number;
    name: string;
    last_name: string | null;
    username: string | null;
    user_status: number;
    accept_condition: number;
    apple_id: string | null;
    google_id: string | null;
    profile_image: string | null;
    email: string;
    email_verified_at: string;
    role_id: number;
    country_id: number | null;
    contract_id: number | null;
    deleted_at: string | null;
    role_name: string;
    country_name: string | null;
    profile_image_path: string;
}


interface User {
    id: number;
    name: string;
    last_name: string | null;
    username: string | null;
    user_status: number;
    accept_condition: number;
    apple_id: string | null;
    google_id: string | null;
    profile_image: string | null;
    email: string;
    email_verified_at: string;
    role_id: number;
    country_id: number | null;
    deleted_at: string | null;
    role_name: string;
    country_name: string | null;
    profile_image_path: string;
}


interface ChatMessage {
    id?: number;
    chat_id?: number;
    sender_id?: number;
    message?: string;
    is_read?: number;
    file_path?: string;
    full_file_path?: String;
    file_type?: string;
    created_at?: string;
    updated_at?: string;
    user: User;
}

interface ChatData {
    id: number;
    user_one_id: number;
    user_two_id: number;
    contract_id: number;
    unread_count: number;
    messages: ChatMessage[];
}

interface ChatPartner {
    id: number;
    name: string;
    last_name: string | null;
    username: string | null;
    user_status: number;
    accept_condition: number | null;
    apple_id: string | null;
    google_id: string | null;
    profile_image: string | null;
    email: string;
    email_verified_at: string | null;
    role_id: number;
    country_id: number;
    deleted_at: string | null;
    chat_id: number;
    contract_id: number;
    project_title: string;
    chat_data: ChatData;
    role_name: string;
    country_name: string;
    profile_image_path: string;
}


interface Preview {
    url: string;
    type: string;
}

function Chat() {
    const user = useSelector((state: RootState) => state.user.user);
    const segment = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [contractSegmentId, setContractSegmentId] = useState<string | number | undefined>(segment.contract_id);

    /// new code
    const [showRoom, setShowRoom] = useState(false);
    const [segmentId, setSegmentId] = useState<string | number | undefined>(segment.chat_id);
    const [chatPartner, setChatPartner] = useState<ChatPartner[] | null>(null);
    const [chatMessage, setChatMessage] = useState<ChatMessage[] | null>(null);
    const [currentChatUser, setCurrentChatUser] = useState<CurrentChatUser | null>(null);
    const [search, setSearch] = useState("");
    const [chatId, setChatId] = useState<number | undefined>(undefined);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<Preview | null>(null);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Adjust breakpoint as needed
    const [refreshKey, setRefreshKey] = useState(0);
    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            const fileURL = URL.createObjectURL(e.target.files[0]);
            setPreview({ url: fileURL, type: e.target.files[0].type });
        }
    };

    const filteredChatPartners = chatPartner?.filter((partner) =>
        partner.name.toLowerCase().includes(search.toLowerCase()) ||
        (partner.last_name && partner.last_name.toLowerCase().includes(search.toLowerCase()))
    );

    const formatUserInitials = (user: any) => {
        if (!user || !user.name) return "";
        let firstName = user.name.trim();
        let lastName = user.last_name ? user.last_name.trim() : null;
        return lastName ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}` :
            (firstName[0] ? firstName[0].toUpperCase() : "") +
            (firstName[1] ? firstName[1].toUpperCase() : "");
    };

    const getParticular = (id: number, contractId: number) => {

        if (id && contractId) {
            setSegmentId(id);
            setContractSegmentId(contractId);
            navigate(`/chat/${id}/${contractId}`);
        } else {

            setSegmentId(id);
            setContractSegmentId(0);
            setRefreshKey(prevKey => prevKey + 1);
            navigate(`/chat/${id}`);
        }

    };

    const isSendDisabled = !message.trim() && !file;

    const sendYourMessage = async () => {
        setSubmitting(true);
        if (isSendDisabled) {
            setSubmitting(false);
            return;
        }

        const formData = new FormData();
        if (chatId !== undefined) formData.append("chat_id", String(chatId));
        if (message.trim()) formData.append("message", message);
        if (file) formData.append("file", file);

        try {
            await axiosInstance.post("chat/send-message", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setPreview(null);
            setFile(null);
            setMessage("");

            if (typeof contractSegmentId === "undefined") {
                await fetchChatData(Number(segmentId)); // Ensure messages update before scrolling
            } else {
                await fetchChatData(Number(segmentId), Number(contractSegmentId)); // Ensure messages update before scrolling
            }

        } catch (error) {
            console.error("Error sending message", error);
        } finally {
            setSubmitting(false);
        }
    };

    const fetchChatData = async (userId = 0, contractId = 0, isInitial = false) => {

        try {
            if (isInitial) setInitialLoading(true); // Show loader only for first load
            let urlPath = userId > 0 ? `chat/start/${userId}/${contractId}` : 'chat/start';
            const response = await axiosInstance.get(urlPath);
            setChatPartner(response.data.chatPartners);
            setChatMessage(response.data.messages);
            setCurrentChatUser(response.data.currentChatUser);
            if (response.data?.chatId !== undefined) {
                setChatId(response.data?.chatId);
            }
        } catch (error) {
            console.error("Error in API request:", error);
        } finally {
            if (isInitial) {
                setTimeout(() => {
                    setInitialLoading(false);
                }, 500);
            }  // Hide loader only after first load
        }
    };

    const formatDateTime = (timestamp: any, type: string) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-GB").replace(/\//g, "/");
        const formattedTime = date.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
        return type === "time" ? formattedTime : `${formattedDate} ${formattedTime}`;
    };

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        });
    };

    useEffect(() => {
        if (chatMessage && chatMessage.length > 0) {
            scrollToBottom();
        }
    }, [chatMessage]);
    useEffect(() => {
        // Function to update isDesktop state based on screen size
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        // Listen for window resize
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // Initial load with loader
        fetchChatData(segmentId ? Number(segmentId) : undefined, contractSegmentId ? Number(contractSegmentId) : undefined, true);

        // Polling without loader
        const interval = setInterval(() => {
            fetchChatData(segmentId ? Number(segmentId) : undefined, contractSegmentId ? Number(contractSegmentId) : undefined);
        }, 5000);

        return () => clearInterval(interval);
    }, [segmentId, contractSegmentId, refreshKey]);

    const removePreview = () => {
        setPreview(null);
        setFile(null);
        setMessage("");
    };

    // new code 

    return (
        <>
            <Loader isLoading={initialLoading} />
            <div id="chat-nuxt">
                <div id="chat-layouts">
                    <div className="chat-desktop-layout">
                        <div className="chat-layout-body">
                            <div className="chat-layout-index" style={{
                                display: isDesktop || !showRoom ? "block" : "none",
                            }}>
                                <div className="sidebar-panel">
                                    <div className="chat-logo-with-content">
                                        <div className="chat-header-log" onClick={() => navigate("/")}>
                                            <img className="img--fluid" height="50px" width="50px" src="/assets/images/logo-icon.png" alt="" title="" />
                                        </div>
                                        <div className="sidebar-profile-with-filter d-flex flex-wrap align-items-center justify-space-between">
                                            <div className="sidebar-profile d-flex align-items-center">
                                                <div className="up-avatar">
                                                    <div className="avatar-content">
                                                        <img className="img--fluid" src={user?.profile_image_path} alt="" title="" />
                                                    </div>
                                                </div>
                                                <div className="profile-text-content">
                                                    <h4>{helpers.capitalizeFirstLetterOfEachWord(user?.name) + " " + (user?.last_name ?? "")}</h4>
                                                    <p>{helpers.toTitleCase(user?.role_name)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sidebar-panel-list">
                                            <div className="header-row">
                                                <h2 className="sidebar-row-header">Messages</h2>
                                            </div>
                                            <div className="sticky-sidebar-panel-header">
                                                <div className="search-row">
                                                    <div className="info-search">
                                                        <span className="search-btns"><img className="img-fluid" src="/assets/images/fi-search-icon.svg" alt="" title="" /></span>
                                                        <input id="rooms-panel-header-search-primary" type="search" placeholder="Search" className="air3-input air3-input-round" value={search}
                                                            onChange={(e) => setSearch(e.target.value)} />
                                                        <div className="search-close"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sidebar-panel-body">
                                        <div className="sidebar-panel-section sidebar-container">
                                            <div className="sidebar-panel-room-list sidebar-panel-items">
                                                {chatPartner ? (
                                                    filteredChatPartners?.map((partner, indexs) => (
                                                        <a onClick={(e) => { e.preventDefault(); setShowRoom(true) }} key={indexs}
                                                            className={`sidebar-list-item ${segmentId == partner.id && contractSegmentId == partner.contract_id ? "active" : ""}
                                             ${segmentId == partner.id && typeof partner.contract_id === 'object' && partner.contract_id !== null ? "active" : ""}
                                             `}
                                                            target="_self" id="">
                                                            <div className="up-avatar" onClick={(e) => { e.preventDefault(); getParticular(partner.id, partner.contract_id) }}>
                                                                <div className="avatar-content" style={{
                                                                    height: "36px", width: "36px", backgroundSize: "contain",
                                                                    backgroundRepeat: "no-repeat",
                                                                    backgroundPosition: "center", backgroundImage: `url(${partner.profile_image_path})`,
                                                                }}>
                                                                    <span className="status offline"></span>
                                                                </div>
                                                            </div>
                                                            <div className="right-content" onClick={() => getParticular(partner.id, partner.contract_id)} >
                                                                <div className="header-row">
                                                                    <h4 className="item-title">{helpers.capitalizeFirstLetterOfEachWord(partner.name)} {helpers.capitalizeFirstLetterOfEachWord(partner.last_name)} {(partner.contract_id) ? "( " + helpers.capitalizeFirstLetterOfEachWord(
                                                                        partner.project_title.split(" ").slice(0, 3).join(" ") +
                                                                        (partner.project_title.trim().split(" ").length > 2 ? "... )" : "")
                                                                    ) : ""}
                                                                    </h4>
                                                                    <div className="times-tamp">{(partner?.chat_data?.messages[0]?.created_at) ? formatDateTime(partner?.chat_data?.messages[0]?.created_at, 'time') : ""}</div>
                                                                </div>
                                                                <div className="body-row">
                                                                    <div className="item-descriptions">
                                                                        <div className="message-last">
                                                                            <div className="message-up">{partner?.chat_data?.messages[0]?.message} </div>
                                                                        </div>
                                                                    </div>
                                                                    {partner?.chat_data?.unread_count > 0 && <div className="indicators-item">
                                                                        <div className="air3-badge-notification">{partner?.chat_data?.unread_count}</div>
                                                                    </div>}
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ))
                                                ) : (
                                                    <p></p>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-layout-room" style={{
                                display: isDesktop || showRoom ? "block" : "none",
                            }}>
                                {segmentId && segmentId !== "" ? (<div className="chat-room">
                                    <div className="chat-room-layout">
                                        <div className="height-div">
                                            <div className="up-room desktop-view">
                                                <div className="chat-room-section">
                                                    <div className="top-chat-content">
                                                        <header className="up-chat-header chat-header">
                                                            <a onClick={() => setShowRoom(false)} className="chat-header-back" href="#"><span className="back-button-wrapper"><img className="img-fluid" src="/assets/images/back-icon.svg" alt="" title="" /></span></a>
                                                            <div className="chat-header-body">
                                                                <div className="up-avatar">
                                                                    <div className="avatar-content-person">
                                                                        <img className="img-fluid" src={currentChatUser?.profile_image_path} alt="" title="" />
                                                                    </div>
                                                                </div>
                                                                <div className="text-info-container">
                                                                    <h4 className="chat-header-title">{helpers.capitalizeFirstLetterOfEachWord(currentChatUser?.name) + " " + (currentChatUser?.last_name ?? "")} </h4>
                                                                    <div className="chat-subtitle">
                                                                        <span className="chat-time">Last seen {currentTime}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="up-chat-header-actions">
                                                                {currentChatUser?.contract_id && (
                                                                    <Link className="redirect-chat" to={`/${user?.role_name}/contracts-details/${currentChatUser.contract_id}`}>
                                                                        <span>View Contract</span>
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </header>
                                                        <div ref={chatContainerRef} className="story-scroll-wrapper">
                                                            <div className="chat-rooms-body">
                                                                <div className="story-listing">

                                                                    {
                                                                        chatMessage?.map((message, index) => (
                                                                            <div key={index}>
                                                                                {(user?.id != message.sender_id) ?
                                                                                    <div key={index} className="client-message-item with-header">
                                                                                        <div className="story-day-header" style={{ display: 'none' }}>
                                                                                            <span className="header-times-tamp">Sunday, Oct 01, 2023</span>
                                                                                            <div className="separator-line"></div>
                                                                                        </div>
                                                                                        <div className="chat-room-story">
                                                                                            <div className="story-inner top">
                                                                                                <div className="avatar-section">
                                                                                                    <div className="story-avatar">
                                                                                                        <span className="avatar-content">{formatUserInitials(message?.user)}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="chat-story-section">
                                                                                                    <div className="chat-story-message">
                                                                                                        <div className="chat-up-message">
                                                                                                            <p>{message.message}</p>
                                                                                                            {message?.file_path && message?.file_type && (
                                                                                                                <div className="file-preview">
                                                                                                                    <a href={String(message.full_file_path)} target="_blank" rel="noopener noreferrer">
                                                                                                                        {String(message.file_type).includes("image") ? (
                                                                                                                            <img src={String(message.full_file_path)} alt="Uploaded file" className="chat-file-img" />
                                                                                                                        ) : String(message.file_type).includes("video") ? (
                                                                                                                            <video controls className="chat-file-video">
                                                                                                                                <source src={String(message.full_file_path)} type={String(message.file_type)} />
                                                                                                                                Your browser does not support the video tag.
                                                                                                                            </video>
                                                                                                                        ) : String(message.file_type).includes("pdf") ? (
                                                                                                                            <iframe
                                                                                                                                src={String(message.full_file_path)}
                                                                                                                                className="chat-file-pdf"
                                                                                                                                title="PDF Preview"
                                                                                                                            />
                                                                                                                        ) : /(doc|docx|xls|xlsx|ppt|pptx)/.test(String(message.file_type)) ? (
                                                                                                                            <iframe
                                                                                                                                src={`https://docs.google.com/gview?url=${encodeURIComponent(String(message.full_file_path))}&embedded=true`}
                                                                                                                                className="chat-file-doc"
                                                                                                                                title="Document Preview"
                                                                                                                            />
                                                                                                                        ) : (
                                                                                                                            <span className="chat-file-link">Download File</span>
                                                                                                                        )}
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                            )}

                                                                                                        </div>
                                                                                                        <span className="times-tamp">{formatDateTime(message.created_at, 'time')} <img className="read-icon" src="/assets/images/tick-icons.svg" alt="" title="" /></span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div> :
                                                                                    <div className="up-story-item top">
                                                                                        <div className="chat-room-story">
                                                                                            <div className="story-inner top">
                                                                                                <div className="chat-story-section">
                                                                                                    <div className="chat-story-message">
                                                                                                        <div className="chat-up-message">
                                                                                                            <p>{message.message}
                                                                                                            </p>
                                                                                                            {message?.file_path && message?.file_type && (
                                                                                                                <div className="file-preview">
                                                                                                                    <a href={String(message.full_file_path)} target="_blank" rel="noopener noreferrer">
                                                                                                                        {String(message.file_type).includes("image") ? (
                                                                                                                            <img src={String(message.full_file_path)} alt="Uploaded file" className="chat-file-img" />
                                                                                                                        ) : String(message.file_type).includes("video") ? (
                                                                                                                            <video controls className="chat-file-video">
                                                                                                                                <source src={String(message.full_file_path)} type={String(message.file_type)} />
                                                                                                                                Your browser does not support the video tag.
                                                                                                                            </video>
                                                                                                                        ) : String(message.file_type).includes("pdf") ? (
                                                                                                                            <iframe
                                                                                                                                src={String(message.full_file_path)}
                                                                                                                                className="chat-file-pdf"
                                                                                                                                title="PDF Preview"
                                                                                                                            />
                                                                                                                        ) : /(doc|docx|xls|xlsx|ppt|pptx)/.test(String(message.file_type)) ? (
                                                                                                                            <iframe
                                                                                                                                src={`https://docs.google.com/gview?url=${encodeURIComponent(String(message.full_file_path))}&embedded=true`}
                                                                                                                                className="chat-file-doc"
                                                                                                                                title="Document Preview"
                                                                                                                            />
                                                                                                                        ) : (
                                                                                                                            <span className="chat-file-link">Download File</span>
                                                                                                                        )}
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                            )}




                                                                                                        </div>
                                                                                                        <span className="times-tamp">{formatDateTime(message.created_at, 'time')}<img className="read-icon" src="/assets/images/read-icon.svg" alt="" title="" /></span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="avatar-section">
                                                                                                    <div className="story-avatar">
                                                                                                        <span className="avatar-content"><img className="img-fluid" src={message?.user?.profile_image_path} alt="" title="" /></span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>}
                                                                            </div>

                                                                        ))}

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div ref={messagesEndRef}></div>
                                                        <div className="composer-container">
                                                            <div className="up-composer">
                                                                <div className="input-area">
                                                                    <div className="composer-wrapper">
                                                                        <div className="composer">
                                                                            {preview && (
                                                                                <div className="file-preview-container">
                                                                                    <div className="file-preview-wrapper">
                                                                                        {preview && (
                                                                                            <div className="file-preview">
                                                                                                {preview.type.startsWith("image/") && (
                                                                                                    <img src={preview.url} alt="Preview" className="preview-item" />
                                                                                                )}
                                                                                                {preview.type.startsWith("video/") && (
                                                                                                    <video src={preview.url} controls className="preview-item" />
                                                                                                )}
                                                                                                {preview.type.startsWith("audio/") && (
                                                                                                    <audio src={preview.url} controls className="preview-audio" />
                                                                                                )}
                                                                                                {preview.type === "application/pdf" && (
                                                                                                    <iframe src={preview.url} className="preview-pdf" title="PDF Preview"></iframe>
                                                                                                )}
                                                                                                {/(doc|docx|xls|xlsx|ppt|pptx)/.test(preview.type) && (
                                                                                                    <iframe
                                                                                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(preview.url)}&embedded=true`}
                                                                                                        className="preview-doc"
                                                                                                        title="Document Preview"
                                                                                                    ></iframe>
                                                                                                )}
                                                                                                <button onClick={removePreview} className="remove-preview">✖</button>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            <textarea name="message" className="form-control" id="message" style={{ textTransform: 'none' }} cols={30} rows={5} placeholder="Type text here..." onChange={(e) => setMessage(e.target.value)} value={message} onKeyDown={(e) => {
                                                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                                                    e.preventDefault(); // Prevents a new line in textarea
                                                                                    sendYourMessage();
                                                                                }
                                                                            }}></textarea>
                                                                            {/* Hidden File Input */}


                                                                            <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                                                                            <div className="file-attachment" onClick={handleIconClick}>
                                                                                <span className="composer-button"><img className="img-fluid" src="/assets/images/atteched-lick-icon.svg" alt="" title="" /></span>
                                                                            </div>
                                                                            <div className="composer-actions-section">
                                                                                <div className="send-message-section">
                                                                                    <a onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        sendYourMessage();
                                                                                    }}
                                                                                    ><span>{!submitting ? 'Send' : 'sending...'}</span> <img className="img-fluid" src="/assets/images/send-icon.svg" alt="" title="" /></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>) : (
                                    <div
                                        className="chat-room"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            backgroundColor: "#f9f9f9",
                                            borderRadius: "10px",
                                            textAlign: "center",
                                            padding: "20px",
                                        }}
                                    >
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                            {/* Inline SVG for Start Chat Illustration */}
                                            <svg
                                                width="150"
                                                height="150"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                style={{ marginBottom: "15px" }}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12 2C6.48 2 2 5.96 2 11C2 13.64 3.3 16.09 5.45 17.92L4.52 21.23C4.42 21.57 4.76 21.85 5.07 21.7L9.9 19.37C10.56 19.46 11.26 19.5 12 19.5C17.52 19.5 22 15.54 22 11C22 5.96 17.52 2 12 2ZM6 10H18V12H6V10ZM15 7H9V9H15V7ZM6 13H12V15H6V13Z"
                                                    fill="#fe6002"
                                                />
                                            </svg>

                                            <h2 style={{ fontSize: "22px", color: "#333", fontFamily: 'Poppins', fontWeight: "bold", marginBottom: "8px" }}>
                                                Start a Conversation
                                            </h2>
                                            <p style={{ fontSize: "16px", color: "#666", fontFamily: 'Poppins', marginBottom: "15px", marginTop: 0 }}>
                                                Send a message to begin your conversation
                                            </p>
                                            {!isDesktop && <button style={{

                                                right: "8px",
                                                top: "8px",
                                                outline: "0",
                                                boxShadow: "0 0 0 transparent",
                                                fontFamily: "'Poppins', sans-serif",
                                                fontSize: "14px", // Smaller font size
                                                fontWeight: "600",
                                                lineHeight: "24px",
                                                border: "0",
                                                display: "inline-block",
                                                color: "#fff",
                                                background: "#FE6002",
                                                padding: "6px 18px", // Reduced padding
                                                borderRadius: "20px", // Slightly rounded corners
                                                cursor: "pointer"
                                            }} onClick={() => setShowRoom(false)}>Back to Chat List</button>}
                                            {isDesktop && <button
                                                style={{

                                                    right: "8px",
                                                    top: "8px",
                                                    outline: "0",
                                                    boxShadow: "0 0 0 transparent",
                                                    fontFamily: "'Poppins', sans-serif",
                                                    fontSize: "14px", // Smaller font size
                                                    fontWeight: "600",
                                                    lineHeight: "24px",
                                                    border: "0",
                                                    display: "inline-block",
                                                    color: "#fff",
                                                    background: "#FE6002",
                                                    padding: "6px 18px", // Reduced padding
                                                    borderRadius: "20px", // Slightly rounded corners
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => navigate("/")}
                                            >
                                                Back to home
                                            </button>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
