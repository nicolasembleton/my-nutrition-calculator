import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "./button";
import { useTheme } from "../../lib/theme-provider";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className="fixed top-4 right-4"
		>
			{theme === 'dark' ? (
				<SunIcon className="h-5 w-5" />
			) : (
				<MoonIcon className="h-5 w-5" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
