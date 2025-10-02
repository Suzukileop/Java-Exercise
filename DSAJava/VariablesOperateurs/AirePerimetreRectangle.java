

public class AirePerimetreRectangle {
    public static void main(String[] args) {
        // declaration de variable longueur et largeur 
        double L , l, Aire, Perimetre;

        // Initialisation de deux variable 
        L = 25;
        l = 10;

        Aire = L * l;
        Perimetre = 2*(L + l);

        System.out.println("On a un rectangle de longueur " + L + " et de largeur 1" + l + ".");
        System.out.println("Aire de cet rectenge = " + Aire);
        System.out.println("Perimetre de cet rectenge = " + Perimetre);

    }
    
}
