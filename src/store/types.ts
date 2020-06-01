// Shows state
export type ShowsStateTypes = {
    isLoading: boolean;
}

// User Auth state
export type UserAuthStateTypes = {
    isLoading: boolean;
    user: string | null;
    snackbar: {
        message: string;
        color: "success" | "info" | "warning" | "error";
        open: boolean;
    };
}