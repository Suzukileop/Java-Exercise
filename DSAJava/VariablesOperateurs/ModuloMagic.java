

public class ModuloMagic {
    public static void main(String[] args) {
        System.out.println("=== MAGIE DU MODULO (%) ===\n");
        
        // 1. Trouver le dernier chiffre d'un nombre
        System.out.println("1. DERNIER CHIFFRE D'UN NOMBRE (% 10)");
        int nombre1 = 157;
        int nombre2 = 42;
        int nombre3 = 9;
        
        System.out.println(nombre1 + " % 10 = " + (nombre1 % 10) + " → dernier chiffre: " + (nombre1 % 10));
        System.out.println(nombre2 + " % 10 = " + (nombre2 % 10) + " → dernier chiffre: " + (nombre2 % 10));
        System.out.println(nombre3 + " % 10 = " + (nombre3 % 10) + " → dernier chiffre: " + (nombre3 % 10));
        
        // 2. Vérifier si un nombre est pair ou impair
        System.out.println("\n2. PAIR OU IMPAIR (% 2)");
        int[] nombres = {8, 7, 15, 22, 31};
        
        for (int n : nombres) {
            String parite = (n % 2 == 0) ? "pair" : "impair";
            System.out.println(n + " % 2 = " + (n % 2) + " → " + n + " est " + parite);
        }
        
        // 3. Contrôler les cycles comme une horloge
        System.out.println("\n3. CYCLES - HORLOGE (% 12)");
        int heureActuelle = 11;
        int heuresAAjouter = 3;
        int nouvelleHeure = (heureActuelle + heuresAAjouter) % 12;
        System.out.println(heureActuelle + "h + " + heuresAAjouter + "h = " + 
                          (heureActuelle + heuresAAjouter) + "h → " + 
                          (heureActuelle + heuresAAjouter) + " % 12 = " + nouvelleHeure + "h");
        
        // Cycle des jours de la semaine (Lundi=1 → Dimanche=0/7)
        System.out.println("\n4. CYCLES - JOURS DE LA SEMAINE (% 7)");
        int aujourdhui = 3; // Mercredi
        int joursAAjouter = 10;
        int futurJour = (aujourdhui + joursAAjouter) % 7;
        
        String[] jours = {"Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"};
        System.out.println("Aujourd'hui: " + jours[aujourdhui] + " (" + aujourdhui + ")");
        System.out.println("Dans " + joursAAjouter + " jours: " + 
                          jours[futurJour] + " (" + futurJour + ")");
        
        // 4. Vérifier la divisibilité
        System.out.println("\n5. DIVISIBILITÉ");
        int a = 15, b = 5, c = 4;
        
        System.out.println(a + " % " + b + " = " + (a % b) + 
                          " → " + (a % b == 0 ? a + " est divisible par " + b : a + " n'est pas divisible par " + b));
        System.out.println(a + " % " + c + " = " + (a % c) + 
                          " → " + (a % c == 0 ? a + " est divisible par " + c : a + " n'est pas divisible par " + c));
        
        // 5. Applications pratiques supplémentaires
        System.out.println("\n6. APPLICATIONS PRATIQUES");
        
        // Vérifier si une année est bissextile
        int annee = 2024;
        boolean estBissextile = (annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0);
        System.out.println("Année " + annee + " bissextile ? " + estBissextile);
        
        // Alternance pair/impair pour mise en forme
        System.out.println("\n7. ALTERNANCE POUR AFFICHAGE");
        for (int i = 1; i <= 6; i++) {
            String style = (i % 2 == 0) ? "[Ligne bleue]" : "[Ligne grise]";
            System.out.println(style + " Élément " + i);
        }
        
        // Limiter une valeur dans une plage (ex: cercle de 360 degrés)
        System.out.println("\n8. LIMITATION DANS UNE PLAGE (% 360)");
        int angle1 = 450;
        int angle2 = 720;
        System.out.println(angle1 + " degrés → " + (angle1 % 360) + " degrés");
        System.out.println(angle2 + " degrés → " + (angle2 % 360) + " degrés");
        
        // 9. Extraire plusieurs chiffres
        System.out.println("\n9. EXTRAIRE DIFFÉRENTS CHIFFRES");
        int nombre = 1234;
        System.out.println("Nombre: " + nombre);
        System.out.println("Dernier chiffre (unités): " + (nombre % 10));
        System.out.println("Deux derniers chiffres: " + (nombre % 100));
        System.out.println("Trois derniers chiffres: " + (nombre % 1000));
    }
}