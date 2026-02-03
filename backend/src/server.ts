
import cors from "cors";
import dotenv from "dotenv";
// import { RedisStore } from "connect-redis"; // Removed for Shared Hosting
// import { redisClient } from "./config/redis"; // Removed
// import sessionClient from "./config/redisSession"; // Removed
// import { initWorkers } from "./workers"; // Removed
import PrismaInstance from "./config/PrismaInstance";
import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import Database from "./design/DataBase";
import { initSocket, getIO } from "./config/socket";
import session from "express-session";
import "./config/module/passport";
import userRoutes from "./routes/user.routes";
import passport from "passport";
import { errorHandler } from "./middlewares/error.middleware";
import otpRoutes from "./routes/otp.routes";
import uiRoutes from "./routes/ui.routes";
import adminRoutes from "./routes/admin.routes";
import interactionRoutes from "./routes/interaction.routes";
import paymentRoutes from "./routes/payment.routes";
import notificationRoutes from "./routes/notification.routes";
import dashboardRoutes from "./routes/dashboard.routes";


// Load environment variables
dotenv.config()

const app = express()
const httpServer = createServer(app);
const PORT = process.env.PORT || 8000;

// ============================================
// DATABASE 
// ============================================
let databaseReady = false;

async function initializeDatabase() {
    try {
        console.log('🔍 Checking database status...');
        const database = Database.getInstance();

        // Initialize database (check existence, create if needed, connect)
        const initialized = await database.initializeDatabase();
        await PrismaInstance.$connect();
        console.log('✅ Prisma connected successfully');

        // Redis Session removed for Shared Hosting
        // await sessionClient.connect(); 

        if (initialized) {
            databaseReady = true;
            console.log('✅ Database is ready for use');

            // Get connection status for logging
            const status = database.getConnectionStatus();
            console.log(`📊 Database Status: Connected=${status.isConnected}, Created=${status.isDatabaseCreated}`);
        } else {
            console.warn('⚠️ Database initialization failed - API will use fallback storage');
            databaseReady = false;
        }
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        databaseReady = false;
    }
}

// Initialize database on startup
initializeDatabase();

// Background Workers removed for Shared Hosting (using direct services)
// initWorkers();

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Allow all origins in development
const allowedOrigins = [
    process.env.FRONTEND_URL,
].filter((origin): origin is string => !!origin);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true)

            // In development, allow all origins
            if (process.env.NODE_ENV !== 'production') {
                return callback(null, true)
            }

            // In production, check against allowed origins
            if (allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
        exposedHeaders: ['Content-Range', 'X-Content-Range'],
        maxAge: 86400, // 24 hours
    })
)

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session configuration
// MemoryStore is used by default if 'store' is not defined.
// NOTE: MemoryStore is not designed for production (leaks memory), 
// but is the only "zero-dependency" option for shared hosting without Redis.
export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'fallback-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
});

app.use(sessionMiddleware)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.sendStatus(200)
})

// Add CORS headers to all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept')
    next()
})

// Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

// Initialize Socket.io (Must be after session middleware)
initSocket(httpServer, sessionMiddleware);

// ============================================
// ROUTES
// ============================================

// Use Routes
app.use('/api/auth', userRoutes);
app.use('/api', otpRoutes);
app.use('/api/uis', uiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Test Route for WebSockets
app.get('/api/test-socket', (req, res) => {
    try {
        const io = getIO();
        io.emit("test-event", { message: "Hello from Backend! WebSockets are working! 🚀" });
        res.json({ success: true, message: "Test event emitted to all clients" });
    } catch (error) {
        console.error("Socket error:", error);
        res.status(500).json({ success: false, error: "Failed to emit event" });
    }
});


// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.path,
    })
})

// ============================================
// ERROR HANDLER
// ============================================

app.use(errorHandler)

// ============================================
// START SERVER
// ============================================

// ============================================

httpServer.listen(PORT, () => {
    console.log('🚀 ============================================')
    console.log(`🚀 UI Management System `)
    console.log(`🚀 ============================================`)
    console.log(`🚀 Server running on: http://localhost:${PORT}`)
    console.log(`🚀 API Documentation: http://localhost:${PORT}/api/docs`)
    console.log(`🚀 Health Check: http://localhost:${PORT}/api/health`)
    console.log('🚀 ============================================')
    console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🚀 API Key configured: ${!!process.env.GEMINI_API_KEY}`)
    console.log('🚀 ============================================')
})

export default app;
