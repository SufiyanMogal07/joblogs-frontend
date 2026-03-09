export const formatDateForInput = (isoString: string) => {
    return isoString.split("T")[0];
}