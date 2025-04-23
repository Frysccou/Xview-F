// ==========================================
// Modelos de datos principales
// ==========================================
export interface IProduct {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	image: string;
	categoryId: number;
	author: string;
	year: number;
	genres: string[];
}

export interface ICategory {
	id: number;
	name: string;
}

export enum Role {
	ADMIN = "admin",
	USER = "user",
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	address: string;
	phone: string;
	role: Role;
}

export interface IOrder {
	id: number;
	status: string;
	date: Date;
	userId: number;
	products: IProduct[];
	productQuantities?: { [productId: number]: number };
}

// ==========================================
// Autenticación y registro
// ==========================================
export interface LoginResponse {
	login: boolean;
	user: IUser;
	token: string;
}

export interface RegisterData extends Record<string, unknown> {
	email: string;
	password: string;
	name: string;
	address: string;
	phone: string;
}

export interface LoginData extends Record<string, unknown> {
	email: string;
	password: string;
}

export interface AuthContextType {
	user: IUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (data: LoginData) => Promise<LoginResponse | undefined>;
	register: (data: RegisterData) => Promise<LoginResponse | undefined>;
	logout: () => void;
	error: string | null;
}

export interface AuthProviderProps {
	children: React.ReactNode;
}

export interface PublicRoutes {
	[key: string]: boolean;
}

// ==========================================
// Pedidos y carrito de compra
// ==========================================

export interface OrderProduct {
	id: number;
	quantity: number;
}

export interface CreateOrderData {
	products: OrderProduct[];
	transactionId?: string;
}

export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

export interface CartActionProps {
	total: number;
	onClearCart: () => void;
	onCheckout: () => void;
}

// ==========================================
// Componentes de UI genéricos
// ==========================================
export interface FormInputProps {
	id: string;
	type: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	required?: boolean;
	minLength?: number;
	className?: string;
	error?: string | false;
}

export interface ErrorDisplayProps {
	message: string;
}

// ==========================================
// Componentes de productos
// ==========================================
export interface ProductCardProps {
	product: IProduct;
	onAddToCart: (product: IProduct) => void;
}

export interface ActionButtonsProps {
	onAddToCart: () => void;
	product: IProduct | null;
}

export interface ProductPricingProps {
	product: IProduct;
}

export interface ProductImageGalleryProps {
	product: IProduct;
}

export interface ProductHeaderProps {
	product: IProduct;
}

export interface ProductDescriptionProps {
	product: IProduct;
}

export interface FeaturedMangasSectionProps {
	mangas: IProduct[];
	loading: boolean;
}

// ==========================================
// Componentes de FAQ y contacto
// ==========================================
export interface FAQ {
	question: string;
	answer: string;
}

export interface FAQAccordionProps {
	faqs: FAQ[];
}

// ==========================================
// Servicios y utilidades
// ==========================================
export interface RequestOptions {
	method?: string;
	headers?: Record<string, string>;
	body?: Record<string, unknown>;
}
