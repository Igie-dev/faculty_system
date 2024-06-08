import "./loader_style.css";

type Props = {
	className?: string;
};
const LoadingSpinner = ({ className }: Props) => {
	return (
		<section className={`container-lds-ring ${className}`}>
			<div className="main-wrapper">
				<div className="spinner">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</div>
			</div>
		</section>
	);
};

export default LoadingSpinner;
