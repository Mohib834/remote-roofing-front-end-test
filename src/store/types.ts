// Shows state
export type ShowsStateTypes = {
    
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