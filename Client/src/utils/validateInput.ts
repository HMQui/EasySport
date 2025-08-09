export class validateInput {
    public email(email: string, isRequired: boolean = true) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (isRequired && !email.trim()) return "Email is required.";

        const isValidEmail = regex.test(email);
        if (!isValidEmail) return "Invalid email address.";

        return true;
    }

    public input(value: string, fieldName: string) {
        if (!value.trim()) return `${fieldName} is required.`;
        return true;
    }

    public password(password: string, isRequired: boolean = true) {
        if (isRequired && !password.trim()) return "Password is required.";

        if (password.length < 8) return "Password must be at least 8 characters.";
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
        if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
        if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
        if (!/[\W_]/.test(password)) return "Password must contain at least one special character.";

        return true;
    }

    public confirmPassword(password: string, confirmPassword: string) {
        if (!confirmPassword.trim()) return "Confirm password is required.";
        if (password !== confirmPassword) return "Passwords do not match.";
        return true;
    }

    public username(username: string, isRequired: boolean = true) {
        const regex = /^[a-zA-Z0-9_]{3,20}$/;

        if (isRequired && !username.trim()) return "Username is required.";
        if (!regex.test(username))
            return "Username must be 3-20 characters, alphanumeric or underscore only.";

        return true;
    }

    public phone(phone: string, isRequired: boolean = true) {
        const regex = /^\+?[0-9]{9,15}$/;

        if (isRequired && !phone.trim()) return "Phone number is required.";
        if (phone.trim().length !== 10) return "Phone number must have 10 numbers.";
        if (!regex.test(phone)) return "Invalid phone number.";

        return true;
    }

    public minLength(value: string, length: number, fieldName: string) {
        if (value.trim().length < length)
            return `${fieldName} must be at least ${length} characters long.`;
        return true;
    }

    public maxLength(value: string, length: number, fieldName: string) {
        if (value.trim().length > length)
            return `${fieldName} must be at most ${length} characters long.`;
        return true;
    }
}
