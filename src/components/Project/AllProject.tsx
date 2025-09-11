import { useEffect, useState } from 'react'
import Header from '../layouts/partials/Header'
import Footer from '../layouts/partials/Footer'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../_helpers/axiosInstance';
import PaginationHtml from '../Common/PaginationHtml';
import helpers from '../../_helpers/common';
import { ApplyProjectModal } from './ApplyProject/ApplyProjectModal';
import { checkUserLoggedIn } from '../../_helpers/checkUserLoggedIn';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../Common/Loader';


const MySwal = withReactContent(Swal);
interface ProjectScope {
  id: number;
  name: string;
  status: string;
  description: string | null;
}

interface ProjectDuration {
  id: number;
  name: string;
  status: string;
  description: string | null;
}

interface ProjectExperience {
  id: number;
  name: string;
  status: string;
  description: string;
}

interface ProjectSkill {
  id: number;
  name: string;

}

interface ProjectCategory {
  id: number;
  name: string;
}
interface ProjectSubCategory {
  id: number;
  name: string;
}
interface ClientUser {
  name: number;
  last_name: string;
}


interface Project {
  id: number;
  title: string;
  description: string;
  project_status: number;
  budget_type: number;
  hourly_from: number;
  hourly_to: number;
  fixed_rate: number;
  project_type_id: number;
  user_id: number;
  project_scope_id: number;
  project_duration_id: number;
  project_experience_id: number;
  next_step: number;
  completed_steps: number;
  project_sub_category: ProjectSubCategory[];
  project_category: ProjectCategory[];
  project_skill: ProjectSkill[];
  project_status_label: string;
  budget_type_label: string;
  project_type_label: string;
  project_scope: ProjectScope;
  project_duration: ProjectDuration;
  project_experience: ProjectExperience;
  client_user: ClientUser;
  created_at: string;
  project_proposal: ProjectProposal[];
}


interface ProjectProposal {
  id: number;
  project_id: number;
  freelancer_id: number;
}





function AllProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allProject, setAllProject] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const [applyJobmodal, setApplyJobmodal] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const loggedIn = checkUserLoggedIn();
  const user = useSelector((state: RootState) => state.user.user);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchPageData(currentPage);

  }, [currentPage, refresh])

  const fetchPageData = async (page = 1) => {
    try {
      setLoading(true);
      const projectResponse: any = await axiosInstance({
        url: 'all-project-list',
        method: "GET",
        params: { page, per_page: perPage }
      });
      setAllProject(projectResponse.data.projects.data);
      setCurrentPage(projectResponse.data.projects.current_page);
      setLastPage(projectResponse.data.projects.last_page);


    } catch (error) {
      console.error("Error in API request:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const getPagination = () => {
    const pages: (number | string)[] = [];
    pages.push(1);
    if (currentPage > 3) {
      pages.push("...");
    }
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(lastPage - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < lastPage - 2) {
      pages.push("...");
    }
    pages.push(lastPage);
    return pages;
  };

  const handlePageChange = (page: any) => {
    if (page > 0 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  const openApplyJobModal = (project: any) => {
    if (!loggedIn) {
      MySwal.fire({
        title: "Login Required",
        text: "Please log in to view the resume.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in");
        }
      });
    } else {
      if (user?.role_name === 'client') {
        MySwal.fire({
          title: "To apply for this job, please log in with your Freelancer account.",
          icon: "warning",
          confirmButtonText: "OK",
        })
      } else {
        setApplyJobmodal(true)
        setProjectId(project.id)
      }

    }

  }

  const handleJobApplied = () => {
    setRefresh(prev => !prev); // Toggle state to trigger re-render
  };

  return (
    <>
      <Loader isLoading={loading} />
      <Header />
      <section className="all-jobs-section">
        <div className="main-container">
          <div className="job-title-block">
            <h1>Find Projects</h1>
          </div>
          <div className="jobs-tab-items">
            <div className="tab-card-section">


              {allProject && allProject.length > 0 ? (
                <>
                  {allProject.map((item, index) => (
                    <div className="tab-card-items" key={index}>
                      <div className="tab-grid-container">
                        <div className="tab-span-colm-9">
                          <div className="contract-cta-sec">
                            <div className="contract-title-block">
                              <h2 className="title">{item.title ? helpers.toTitleCase(item.title) : "No Title"}</h2>
                            </div>

                            <div className="cta-middle-content">

                              <div className="cta-grid-container">
                                <div className="span-3-colm">
                                  <div className="contract-info-content">
                                    <h4 className="openings-title">Posted by: {helpers.toTitleCase(item?.client_user?.name) + " " + item?.client_user?.last_name}</h4>
                                    <div className="opening-status-text">
                                      <span>Posted on: {helpers.formatDate(item?.created_at)}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="span-9-colm">
                                  <div className="contract-feedback-info">
                                    <div className="activity-data-info">
                                      <div className="title-badge-onboard d-flex align-items-center badge-gaps">
                                        <div className="air-badge">{(item.project_status == 3) ? "Active" : ""}</div>
                                        <div className="badge-text-info">
                                          <div className="badge-text-base">
                                            <span> {helpers.toTitleCase(item.project_type_label)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="job-show-description">
                                      {item.budget_type && (
                                        <p>
                                          <strong>Budget:</strong> {helpers.toTitleCase(item.budget_type_label)}  {item.budget_type == 1 ? (
                                            <span>${item.hourly_from} to ${item.hourly_to}/hr</span>
                                          ) : (
                                            <span>${item.fixed_rate}/hr</span>
                                          )}
                                        </p>
                                      )}

                                      {item.project_skill?.length > 0 && (
                                        <p>
                                          <strong>Accounting Certifications:</strong>{" "}
                                          {item.project_skill.map((certificate) => certificate.name).join(", ") + "."}
                                        </p>
                                      )}
                                      {item.project_category?.length > 0 && (
                                        <p>
                                          <strong>Accounting Sector:</strong>{" "}
                                          {item.project_category.map((sector) => sector.name).join(", ") + "."}
                                        </p>
                                      )}
                                      {item.project_sub_category?.length > 0 && (
                                        <p>
                                          <strong>Accounting Skill:</strong>{" "}
                                          {item.project_sub_category.map((skill) => skill.name).join(", ") + "."}
                                        </p>
                                      )}
                                      <p>
                                        <strong>Project Type:</strong> {helpers.toTitleCase(item.project_type_label)}
                                      </p>
                                      {item?.project_duration?.name && (
                                        <p>
                                          <strong>Duration:</strong> {item?.project_duration?.name}
                                        </p>
                                      )}
                                      {item?.project_experience?.name && (
                                        <p>
                                          <strong>Experience Level:</strong> {item?.project_experience?.name}
                                        </p>
                                      )}
                                      {item.description && (
                                        <p>
                                          <strong>Description:</strong><span dangerouslySetInnerHTML={{ __html: item.description }}></span>
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tab-span-colm-3">
                          <div className="d-flex tab-btns-grid">
                            <div className="tab-btns-items">
                              {user ? (
                                <>
                                  {item?.project_proposal?.some(p => p.freelancer_id === user?.id) ? (

                                    <Link className="tab-view-btns" to="/freelancer/applied-jobs"  >View application</Link>
                                  ) : (
                                    <a className="tab-view-btns" href="#" onClick={() => openApplyJobModal(item)} >Apply now</a>
                                  )}
                                </>) : (<a className="tab-view-btns" href="#" onClick={() => openApplyJobModal(item)} >Apply now</a>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="tab-card-section">
                  <div className="tab-card-items">
                    <div className="tab-grid-container">
                      <div className="tab-span-colm-12">
                        No job found
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pagination">
                {!allProject && lastPage > 1 && (<PaginationHtml lastPage={lastPage} getPagination={getPagination} currentPage={currentPage} handlePageChange={handlePageChange} />)}
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
      <ApplyProjectModal id={projectId} isOpen={applyJobmodal} onJobApplied={handleJobApplied} onClose={() => setApplyJobmodal(false)} />
    </>


  )
}

export default AllProject