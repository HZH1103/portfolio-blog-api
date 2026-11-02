const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const postRoutes = require('./routes/postRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Trust the single hosting proxy only when deployment configuration enables it.
if (process.env.TRUST_PROXY === '1') {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '32kb' }));
app.get('/health', require('./controllers/healthController'));
app.get('/', function (req, res) {
  res.json({ message: 'Portfolio and Blog API' });
});
app.use('/api/posts', postRoutes);
app.use('/api/blog', postRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.use('/api/users', require('./routes/userRoutes'));
app.use(require('./middleware/notFound'));
app.use(require('./middleware/errorHandler'));

module.exports = app;
