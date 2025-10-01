package VariablesOperateurs;

// Valeur ne peut pas etre modifier une fois initialise en utilisant le mot-cle initial
public class NotionConstante {
    public static void main(String[] args) {
        // Aire d'un cercle 
        int rayon = 6;
        final double pi = 3.14;
        double surface = pi * ((int) Math.pow(rayon, 2));

        
        System.out.println("Soit un cercle de rayon r : " + rayon);
        System.out.println("Aire de cette cercle = pi * r^2");
        System.out.println(surface);
    
    }
    
}
