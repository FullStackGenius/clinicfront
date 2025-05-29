const ContentLoader = () => {
  return (
    // <div
    //   className="loader-wrapper"
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '100%',
    //   }}
    // >
    //   <span className="loader-item"></span>
    //   <span style={{ color: '#FE6002', marginLeft: '8px' }}>Wait Loading...</span>
    // </div>

    <div className="loader-blocks">
 
    <div className="dots-loader">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div className="bars-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
	
	</div>
  );
};

export default ContentLoader;