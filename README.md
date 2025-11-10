# Structure des Schémas Prisma

Ce dossier contient les modèles Prisma organisés en fichiers séparés pour une meilleure lisibilité et maintenance.

## 📁 Structure des fichiers

### Fichiers de modèles
- `user.prisma` - Modèle User (utilisateurs de base)
- `agence.prisma` - Modèle Agence
- `agency-employees.prisma` - Modèle AgencyEmployee (employés d'agence)
- `locataire.prisma` - Modèle Locataire  
- `quittance.prisma` - Modèle Quittance

### Fichiers principaux
- `schema.prisma` - Schéma principal (généré automatiquement)
- `seed.ts` - Données de test
- `README.md` - Documentation

## 🔧 Utilisation

### Combiner les schémas
```bash
npm run db:merge
```

### Générer le client Prisma
```bash
npm run db:generate
```

### Créer les migrations
```bash
npm run db:migrate
```

### Ajouter des données de test
```bash
npm run db:seed
```

## 📋 Modèles disponibles

### Agence
- `id` (UUID)
- `name` (String)
- `email` (String, unique)
- `adresse` (String)
- `role` (Enum: "agency")

### Locataire
- `id` (UUID)
- `name` (String)
- `email` (String, unique)
- `adresse` (String)
- `role` (Enum: "tenant")

### Quittance
- `id` (UUID)
- `tenantId` (String, FK)
- `agencyId` (String, FK)
- `amount` (Decimal)
- `period` (String, YYYY-MM)
- `paymentDate` (Date)
- `paid` (Boolean)
- `adresse` (String)
- `link` (String, optional)

## 🔗 Relations

- **User → Locataire** (One-to-One)
- **User → AgencyEmployee** (One-to-One)
- **Agence → AgencyEmployee** (One-to-Many)
- **Agence ↔ Locataire** (Many-to-Many direct)
- **Agence → Quittance** (One-to-Many)
- **Locataire → Quittance** (One-to-Many)
