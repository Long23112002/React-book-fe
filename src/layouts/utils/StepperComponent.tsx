import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import StepConnector, {
	stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			background: "rgb(47,128,237)",
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			background: "rgb(47,128,237)",
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor:
			theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled("div")<{
	ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
	backgroundColor:
		theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
	zIndex: 1,
	color: "#fff",
	width: 50,
	height: 50,
	display: "flex",
	borderRadius: "50%",
	justifyContent: "center",
	alignItems: "center",
	...(ownerState.active && {
		background: "rgb(47,128,237)",
		boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
	}),
	...(ownerState.completed && {
		background: "rgb(47,128,237)",
	}),
}));

function ColorlibStepIcon4(props: StepIconProps) {
	const { active, completed, className } = props;

	let icons: { [index: string]: React.ReactElement } = {
		1: <SettingsIcon />,
		2: <LocalShippingRoundedIcon />,
		3: <CheckCircleRoundedIcon />,
		4: <CloseRoundedIcon />,
	};

	return (
		<ColorlibStepIconRoot
			ownerState={{ completed, active }}
			className={className}
		>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

function ColorlibStepIcon2(props: StepIconProps) {
	const { active, completed, className } = props;

	let icons: { [index: string]: React.ReactElement } = {
		1: <SettingsIcon />,
		2: <CloseRoundedIcon />,
	};

	return (
		<ColorlibStepIconRoot
			ownerState={{ completed, active }}
			className={className}
		>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

interface StepperProps {
	steps?: any[];
	activeStep?: number;
}

export const StepperComponent: React.FC<StepperProps> = (props) => {
	return (
		<Stack sx={{ width: "100%" }} spacing={4}>
			<Stepper
				alternativeLabel
				activeStep={props.activeStep}
				connector={<ColorlibConnector />}
			>
				{props.steps?.map((label) => (
					<Step key={label}>
						<StepLabel
							StepIconComponent={
								props.steps?.length === 2
									? ColorlibStepIcon2
									: ColorlibStepIcon4
							}
						>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	);
};
