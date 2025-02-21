const ButtonLoader = () => {
  return (
	<div className="loader-wrapper"
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
      }}
	>
		<span className="loader-button"></span>
		<span style={{ marginLeft: '8px' }}>Wait...</span>
	</div>
  );
};

export default ButtonLoader;