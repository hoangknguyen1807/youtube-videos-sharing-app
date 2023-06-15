export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / (60 * 60));
    const divisor_for_minutes = seconds % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);
    const divisor_for_seconds = divisor_for_minutes % 60;
    const sec = Math.ceil(divisor_for_seconds);

    return ` ${hours !== 0 ? `${hours}h` : ''} ${minutes !== 0 ? `${minutes} :` : ''}  ${
        sec !== 0 ? `${sec < 10 ? `0${sec}` : sec}` : ''
    }`;
};
