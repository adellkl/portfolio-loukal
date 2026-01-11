-- Script SQL pour importer les projets existants depuis content_option.js
-- Exécuter avec: psql -d portfolio_db -f import-projects.sql

-- Nettoyer les projets existants (optionnel - commentez si vous voulez garder les existants)
-- TRUNCATE TABLE projects RESTART IDENTITY CASCADE;

-- Insérer les projets
INSERT INTO projects (ordre, titre, lien, couleur_hover, description, date, img, technologies) VALUES
(1, 'OpenMat France - Gestion des Open Mats', 'https://open-mat-france.vercel.app/', '#4a9eff', 'OpenMat France est une application permettant d''ajouter et de consulter des sessions d''Open Mat de Jiu-Jitsu Brésilien et de Grappling en France. Les utilisateurs peuvent créer un événement en remplissant un formulaire.', '2025-01-01', NULL, '["React", "Tailwind CSS", "Node.js", "Supabase [Base de données]"]'::jsonb),
(2, 'MDP - Générateur', 'https://password-generator-mocha-sigma.vercel.app/', '#4a9eff', 'Mon application vous aide à créer des mots de passe sécurisés pour tous vos identifiants. Elle génère des mots de passe robustes et uniques, incluant des caractères spéciaux, des chiffres et des lettres majuscules/minuscules, pour protéger vos comptes contre les cybermenaces.', '2025-01-01', NULL, '["React", "Tailwind CSS", "Node.js", "Supabase [Base de données]"]'::jsonb),
(3, 'Portfolio', 'https://github.com/adellkl/portfolio-loukal.git', '#4a9eff', 'Portfolio réalisé avec React et TailwindCSS pour mettre en avant mes compétences et mes projets.', '2025-01-01', NULL, '["React", "Tailwind CSS", "Node.js"]'::jsonb),
(4, 'test-psychotechnique-permis', 'https://test-psychotechnique-permis.com', '#4a9eff', 'Site web moderne développé avec Next.js pour la préparation aux tests psychotechniques du permis de conduire.', '2025-01-01', NULL, '["Next.js", "React", "TailwindCSS"]'::jsonb),
(5, 'Alpha Fight Club', 'https://alpha-fight-club.vercel.app/', '#4a9eff', 'Site Réalisé avec React et TailwindCSS pour mettre en avant un club de grappling et de jiu-jitsu brésilien.', '2025-01-01', NULL, '["React", "Tailwind CSS", "Node.js", "Supabase [Base de données]"]'::jsonb),
(6, 'Maquette Figma - ISCOM Talent', 'https://www.figma.com/proto/EB2NXGZIzJlLeboP9cPWUo/ISCOM-Talent?node-id=555-4246&t=e0bL8NgCfYxG8nBX-0&scaling=scale-down&page-id=86%3A5531&starting-point-node-id=555%3A4246&show-proto-sidebar=1&content-scaling=fixed', '#4a9eff', 'Dans le cadre de mon stage de 6 mois en deuxième année de Bachelor, j''ai réalisé, en collaboration avec le chef de projet UX/UI (Monsieur Darabor), la maquette du projet ''ISCOM TALENT''. J''ai participé à la définition de la charte graphique, à l''élaboration de la maquette sur Figma et à la rédaction du cahier des charges détaillant les fonctionnalités et exigences du projet.', '2025-01-01', NULL, '["React", "Tailwind CSS", "Node.js"]'::jsonb)
ON CONFLICT DO NOTHING;

-- Vérifier les projets insérés
SELECT id, ordre, titre, date FROM projects ORDER BY ordre;