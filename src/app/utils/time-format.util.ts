export function formattedTime(time: number): string {
    const totalSeconds = time;
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(n: number): string {
    return n.toString().padStart(2, '0');
}