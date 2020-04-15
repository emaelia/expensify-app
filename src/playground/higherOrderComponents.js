import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
		<div>
			<h1>Info</h1>
			<p>This info is {props.info}</p>
		</div>
	);

const withAdminWarning = (WrappedComponent) => {
	return (props) => (
			<div>
				{ props.isAdmin && <p>This is  private; do not share</p> }
				<WrappedComponent {...props} />
			</div>
		)
};

const requireAuthentication = (WrappedComponent) => {
	return (props) => (
			<div>
				{ props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Authorization needed</p> }
				
			</div>
		)
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


ReactDOM.render(<AuthInfo isAuthenticated={true} info='some new details' />, document.getElementById('app'));
//ReactDOM.render(<AdminInfo isAdmin={false} info='some new details' />, document.getElementById('app'));